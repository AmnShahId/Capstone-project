CALCPRO — Smart Calculator & GPA Calculator

FILES
- index.html, style.css, script.js: responsive browser interface
- main.c: separate C capstone program (under 100 lines)
- CalcPro_Capstone.pdf: architecture page followed by C source code

RUN THE WEB INTERFACE
1. Extract this folder.
2. Double-click index.html, or open it in a browser.
3. For phone presentation, upload index.html, style.css and script.js to a static host such as Netlify, or run a local server and open the laptop's local network address on the phone.

COMPILE THE C PROGRAM
Install GCC, open a terminal in this folder, then run:
    gcc main.c -o calcpro
    .\calcpro.exe

C PROGRAM FEATURES
- Basic calculator: addition, subtraction, multiplication and division
- GPA calculator: five subjects, percentage and GPA out of 4
- Two custom functions: calculateGPA() and displayGradeReport()
- switch-case, if-else, for loop, do-while loop and input checks

GPA FORMULA
Percentage = total marks / 5
GPA = (percentage / 100) * 4

The GPA formula and grade bands are simplified for this educational project.
They are not an official conversion scale for every school or university.

IMPORTANT CAPSTONE NOTE
The browser interface uses JavaScript for its interactive demonstration. The separate
main.c is the actual C source code for live compilation. Explain this honestly to
your supervisor and ask whether the browser interface is acceptable as a presentation
layer. If they require all calculations to run in C during the demo, demonstrate main.c.
