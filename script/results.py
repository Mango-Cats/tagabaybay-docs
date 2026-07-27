#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.9"
# dependencies = [
#     "matplotlib",
#     "numpy",
# ]
# ///
import matplotlib.pyplot as plt
import numpy as np

# Data
conditions = ["5-vowel", "(e,i,y)", "(o,u)", "3-vowel"]

regex = [20.38, 17.17, 20.04, 16.83]
spelling_only = [17.73, 14.50, 17.42, 14.19]
ipa_guided = [5.14, 4.14, 5.05, 4.05]
llm = [15.54, 13.39, 15.29, 13.14]

# X positions
x = np.arange(len(conditions))
width = 0.19

# Create figure
fig, ax = plt.subplots(figsize=(14.25, 9.15))

# Bars
bars_regex = ax.bar(
    x - 1.5 * width, regex, width,
    label="Regex",
    color="#929292"
)

bars_spelling = ax.bar(
    x - 0.5 * width, spelling_only, width,
    label="Spelling-only",
    color="#5B9BD5"
)

bars_ipa = ax.bar(
    x + 0.5 * width, ipa_guided, width,
    label="IPA-guided",
    color="#2E7D32"
)

bars_llm = ax.bar(
    x + 1.5 * width, llm, width,
    label="LLM",
    color="#C0392B"
)

# Add value labels above bars
def add_labels(bars):
    for bar in bars:
        height = bar.get_height()
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            height + 0.25,
            f"{height:.2f}",
            ha="center",
            va="bottom",
            fontsize=14
        )

add_labels(bars_regex)
add_labels(bars_spelling)
add_labels(bars_ipa)
add_labels(bars_llm)

# Axis labels
ax.set_xlabel(
    "Vowel-equivalence condition",
    fontsize=22
)

ax.set_ylabel(
    "Character Error Rate (%)",
    fontsize=22
)

# X-axis
ax.set_xticks(x)
ax.set_xticklabels(
    conditions,
    fontsize=20
)

# Y-axis
ax.set_ylim(0, 24)
ax.set_yticks([0, 5, 10, 15, 20])
ax.tick_params(axis="y", labelsize=18)

# Legend
ax.legend(
    fontsize=18,
    frameon=False,
    loc="upper right"
)

# Spine and tick styling
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)

ax.spines["left"].set_linewidth(1.8)
ax.spines["bottom"].set_linewidth(1.8)

ax.tick_params(
    axis="both",
    width=1.8,
    length=7
)

# Layout
plt.tight_layout()

# Save the figure
plt.savefig(
    "cer_by_system_no_title.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()