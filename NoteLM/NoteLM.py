import os
import time
import re
import sqlite3
from datetime import datetime

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors

import google.generativeai as genai
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.markdown import Markdown

from gtts import gTTS
import pygame


# ==========================================================
# CONFIGURATION
# ==========================================================

MODEL_NAME = "gemini-2.5-flash"
GEMINI_API_KEY = "<API_KEY>"

console = Console()
DB_NAME = "NoteLM.db"


# ==========================================================
# DATABASE INITIALIZATION
# ==========================================================

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            model TEXT,
            generated_at TEXT,
            latency REAL,
            pdf_file TEXT
        )
    """)

    conn.commit()
    conn.close()


def save_to_db(data, pdf_filename):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO notes (
            question,
            model,
            generated_at,
            latency,
            pdf_file
        ) VALUES (?, ?, ?, ?, ?)
    """, (
        data["question"],
        data["model"],
        data["generated_at"],
        data["latency"],
        pdf_filename
    ))

    conn.commit()
    conn.close()


# ==========================================================
# TIME UTILITIES
# ==========================================================

def timestamp():
    return datetime.now().astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")


# ==========================================================
# FILE SEQUENCE
# ==========================================================

def next_sequence():
    existing = [
        f for f in os.listdir()
        if f.startswith("USER_NOTELM") and f.endswith(".pdf")
    ]
    return len(existing) + 1


# ==========================================================
# CLEAN TEXT FOR TTS
# ==========================================================

def clean_for_tts(text):
    text = re.sub(r"\*\*|\*|`|#", "", text)
    text = re.sub(r"\n+", ". ", text)
    return text


# ==========================================================
# AUDIO PLAYBACK (PLAY / PAUSE / STOP)
# ==========================================================

class AudioPlayer:
    def __init__(self):
        pygame.mixer.init()
        self.is_paused = False
        self.is_playing = False
        self.audio_file = "notelm_response.mp3"

    def generate_audio(self, text):
        cleaned = clean_for_tts(text)
        tts = gTTS(text=cleaned)
        tts.save(self.audio_file)

    def play(self):
        if not self.is_playing:
            pygame.mixer.music.load(self.audio_file)
            pygame.mixer.music.play()
            self.is_playing = True
            self.is_paused = False
        elif self.is_paused:
            pygame.mixer.music.unpause()
            self.is_paused = False

    def pause(self):
        if self.is_playing and not self.is_paused:
            pygame.mixer.music.pause()
            self.is_paused = True

    def stop(self):
        pygame.mixer.music.stop()
        self.is_playing = False
        self.is_paused = False


# ==========================================================
# INLINE MARKDOWN CLEANING (PDF)
# ==========================================================

def clean_for_pdf(text):
    text = re.sub(r"\*\*\*(.*?)\*\*\*", r"<b><i>\1</i></b>", text)
    text = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*(?!\s)(.*?)\*(?!\*)", r"<i>\1</i>", text)
    text = re.sub(r"`(.*?)`", r"<font name='Courier'>\1</font>", text)

    text = re.sub(r"^### (.*)", r"<b>\1</b>", text)
    text = re.sub(r"^## (.*)", r"<b>\1</b>", text)
    text = re.sub(r"^# (.*)", r"<b>\1</b>", text)

    text = re.sub(r"^[\-\*] (.*)", r"• \1", text)

    return text


# ==========================================================
# MARKDOWN → PDF RENDERER
# ==========================================================

def render_markdown_to_pdf(text, elements, body_style):
    lines = text.split("\n")

    for line in lines:
        stripped = line.strip()

        if stripped == "---":
            elements.append(Spacer(1, 0.2 * inch))
            elements.append(HRFlowable(width="100%", thickness=1, color=colors.grey))
            elements.append(Spacer(1, 0.2 * inch))
            continue

        if stripped != "":
            elements.append(Paragraph(clean_for_pdf(stripped), body_style))
            elements.append(Spacer(1, 0.12 * inch))


# ==========================================================
# GEMINI API CALL
# ==========================================================

def call_gemini(question):

    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(MODEL_NAME)

    start_time = time.time()
    response = model.generate_content(question)
    latency = round(time.time() - start_time, 4)

    answer = response.text if hasattr(response, "text") else ""

    return {
        "question": question,
        "answer": answer,
        "model": "NoteLM v1.1.0",
        "generated_at": timestamp(),
        "latency": latency
    }


# ==========================================================
# PDF GENERATION
# ==========================================================

# ==========================================================
# PDF GENERATION (WITH METADATA)
# ==========================================================

def generate_user_pdf(data, filename):

    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=60,
        leftMargin=60,
        topMargin=70,
        bottomMargin=60
    )

    elements = []

    title_style = ParagraphStyle(
        name="TitleStyle",
        fontName="Times-Bold",
        fontSize=22,
        alignment=1,
        spaceAfter=18
    )

    section_style = ParagraphStyle(
        name="SectionStyle",
        fontName="Times-Bold",
        fontSize=14,
        spaceBefore=18,
        spaceAfter=8
    )

    body_style = ParagraphStyle(
        name="BodyStyle",
        fontName="Times-Roman",
        fontSize=12,
        leading=18
    )

    metadata_label_style = ParagraphStyle(
        name="MetaLabel",
        fontName="Times-Bold",
        fontSize=11
    )

    metadata_value_style = ParagraphStyle(
        name="MetaValue",
        fontName="Times-Roman",
        fontSize=11,
        textColor=colors.grey
    )

    # TITLE
    elements.append(Paragraph("NOTELM NOTEBOOK GPT", title_style))
    elements.append(HRFlowable(width="100%", thickness=1, color=colors.black))
    elements.append(Spacer(1, 0.4 * inch))

    # QUESTION
    elements.append(Paragraph("Question", section_style))
    render_markdown_to_pdf(data["question"], elements, body_style)

    elements.append(Spacer(1, 0.3 * inch))

    # RESPONSE
    elements.append(Paragraph("NoteLM Generated Response", section_style))
    render_markdown_to_pdf(data["answer"], elements, body_style)

    elements.append(Spacer(1, 0.5 * inch))
    elements.append(HRFlowable(width="100%", thickness=0.6, color=colors.grey))
    elements.append(Spacer(1, 0.3 * inch))

    # METADATA
    elements.append(Paragraph("Metadata", section_style))
    elements.append(Spacer(1, 0.2 * inch))

    elements.append(Paragraph("Model Used:", metadata_label_style))
    elements.append(Paragraph(data["model"], metadata_value_style))
    elements.append(Spacer(1, 0.1 * inch))

    elements.append(Paragraph("Generated At:", metadata_label_style))
    elements.append(Paragraph(data["generated_at"], metadata_value_style))
    elements.append(Spacer(1, 0.1 * inch))

    elements.append(Paragraph("API Latency:", metadata_label_style))
    elements.append(Paragraph(f"{data['latency']} seconds", metadata_value_style))

    doc.build(elements)

# ==========================================================
# MAIN
# ==========================================================

def main():

    init_db()

    console.print(Panel("NoteLM Ai: Terminal Notebook Software", title="NoteLM"))

    question = Prompt.ask("\nYour Question")

    with console.status("NoteLM Is Cooking Data..."):
        result = call_gemini(question)

    console.print(Panel(Markdown(result["answer"]), title="AI Response Preview"))

    # ---------------- AUDIO SECTION ----------------

    audio_player = AudioPlayer()
    audio_player.generate_audio(result["answer"])

    console.print("\nAudio Notes:")
    console.print("P → Play")
    console.print("Enter → Pause")
    console.print("S → Stop")
    console.print("Q → Continue to PDF\n")

    while True:
        key = Prompt.ask("Command").lower()

        if key == "p":
            audio_player.play()
        elif key == "":
            audio_player.pause()
        elif key == "s":
            audio_player.stop()
        elif key == "q":
            audio_player.stop()
            break

    # ---------------- PDF SECTION ----------------

    sequence = next_sequence()
    filename = f"USER_NOTELM{sequence}.pdf"

    generate_user_pdf(result, filename)
    save_to_db(result, filename)

    console.print(f"\nSaved successfully as: {filename}")


if __name__ == "__main__":
    main()
