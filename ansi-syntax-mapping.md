# ANSI Syntax Mapping

| Syntax | Claude `dark-ansi` observed | Codex `ansi` |
|---|---:|---:|
| Normal text/punctuation | 7 — white | terminal default |
| Comments | — | 2 — green |
| Keywords | 14 — bright cyan | 5 — magenta |
| Function names | 11 — bright yellow | 4 — blue |
| Parameters/labels | — | 6 — cyan |
| Classes/types | — | 3 — yellow |
| Strings | 10 — bright green | 2 — green |
| Numbers/constants | — | 3 — yellow |
| HTML/XML tags | — | 1 — red |
| Attributes | — | 3 — yellow |
| Regex/escapes | — | 6 — cyan |

The Claude column is what was directly captured from its theme preview; that preview did not contain enough syntax to determine every category.

The Codex column is the complete underlying `ansi.tmTheme` mapping. Codex loads the `two_face` ANSI theme and interprets the encoded values as terminal palette indices.

Claude `dark-ansi` and Codex `ansi` do not assign the same terminal slots to syntax. Claude uses bright slots in the sample; Codex’s theme uses slots 1–6 and the terminal’s default foreground. The terminal palette determines the actual RGB color displayed for each slot.
