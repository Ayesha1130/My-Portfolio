import json
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_LEFT

with open("data/site-content.json") as f:
    data = json.load(f)

profile = data["profile"]
about = data["about"]
tech = data["techStack"]
featured = data["featuredProjects"]
earlier = data["earlierProjects"]

styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    "Name", parent=styles["Title"], fontSize=24, leading=28, spaceAfter=2,
    textColor=colors.HexColor("#0a0f1e"), alignment=TA_LEFT, fontName="Helvetica-Bold",
)
role_style = ParagraphStyle(
    "Role", parent=styles["Normal"], fontSize=12.5, leading=16,
    textColor=colors.HexColor("#00aae3"), fontName="Helvetica-Bold", spaceAfter=6,
)
contact_style = ParagraphStyle(
    "Contact", parent=styles["Normal"], fontSize=9.3, leading=13,
    textColor=colors.HexColor("#444444"), spaceAfter=10,
)
section_style = ParagraphStyle(
    "Section", parent=styles["Heading2"], fontSize=11.5, leading=14,
    textColor=colors.HexColor("#0a0f1e"), spaceBefore=10, spaceAfter=5,
    fontName="Helvetica-Bold",
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"], fontSize=9.7, leading=14,
    textColor=colors.HexColor("#222222"),
)
skill_style = ParagraphStyle(
    "Skill", parent=styles["Normal"], fontSize=9.5, leading=14,
    textColor=colors.HexColor("#222222"),
)
project_title_style = ParagraphStyle(
    "ProjectTitle", parent=styles["Normal"], fontSize=10.3, leading=14,
    textColor=colors.HexColor("#0a0f1e"), fontName="Helvetica-Bold", spaceBefore=6,
)
project_meta_style = ParagraphStyle(
    "ProjectMeta", parent=styles["Normal"], fontSize=8.6, leading=12,
    textColor=colors.HexColor("#00aae3"), spaceAfter=3,
)
bullet_style = ParagraphStyle(
    "Bullet", parent=styles["Normal"], fontSize=9.3, leading=13,
    textColor=colors.HexColor("#222222"), leftIndent=10, spaceAfter=1,
)
small_style = ParagraphStyle(
    "Small", parent=styles["Normal"], fontSize=9, leading=13,
    textColor=colors.HexColor("#333333"),
)

doc = SimpleDocTemplate(
    "public/cv/Ayesha-Iqbal-CV.pdf",
    pagesize=letter,
    leftMargin=0.65 * inch,
    rightMargin=0.65 * inch,
    topMargin=0.45 * inch,
    bottomMargin=0.45 * inch,
    title=f"{profile['name']} - CV",
    author=profile["name"],
)

story = []

story.append(Paragraph(profile["name"], name_style))
story.append(Paragraph(profile["role"], role_style))

contact_line = (
    f'{profile["email"]} &nbsp;|&nbsp; {profile["location"]} &nbsp;|&nbsp; '
    f'<link href="{profile["social"]["github"]}"><u>GitHub</u></link> &nbsp;|&nbsp; '
    f'<link href="{profile["social"]["linkedin"]}"><u>LinkedIn</u></link> &nbsp;|&nbsp; '
    f'<link href="{profile["social"]["instagram"]}"><u>Instagram</u></link>'
)
story.append(Paragraph(contact_line, contact_style))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#dddddd")))

story.append(Paragraph("SUMMARY", section_style))
story.append(Paragraph(profile["summary"], body_style))

story.append(Paragraph("TECHNICAL SKILLS", section_style))
skill_rows = []
for category, items in tech.items():
    skill_rows.append([
        Paragraph(f"<b>{category}</b>", skill_style),
        Paragraph(", ".join(items), skill_style),
    ])
skill_table = Table(skill_rows, colWidths=[1.7 * inch, 5.35 * inch])
skill_table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ("TOPPADDING", (0, 0), (-1, -1), 2),
]))
story.append(skill_table)

story.append(Paragraph("FEATURED PROJECTS", section_style))
for p in featured:
    story.append(Paragraph(p["name"], project_title_style))
    links = []
    if p.get("liveUrl"):
        links.append(f'Live: {p["liveUrl"]}')
    if p.get("githubUrl"):
        links.append(f'GitHub: {p["githubUrl"]}')
    if links:
        story.append(Paragraph(" &nbsp;|&nbsp; ".join(links), project_meta_style))
    story.append(Paragraph(p["description"], body_style))
    for feat in p["features"][:3]:
        story.append(Paragraph(f"• {feat}", bullet_style))
    story.append(Paragraph(f'<i>Tech: {", ".join(p["stack"])}</i>', small_style))
    story.append(Spacer(1, 3))

story.append(Paragraph("OTHER PROJECTS", section_style))
other_line = "; ".join([p["title"] for p in earlier])
story.append(Paragraph(other_line, body_style))

doc.build(story)
print("CV generated.")
