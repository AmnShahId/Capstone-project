#include <stdio.h>
#define SUBJECTS 5

double calculateGPA(double marks[], int n) {
    double total = 0;
    for (int i = 0; i < n; i++) total += marks[i];
    return (total / (n * 100.0)) * 4.0;
}

void displayGradeReport(double percentage, double gpa) {
    printf("\n--- GPA REPORT ---\n");
    printf("Percentage: %.2f%%\nGPA: %.2f / 4.00\n", percentage, gpa);
    if (percentage >= 90) printf("Grade: A+\n");
    else if (percentage >= 80) printf("Grade: A\n");
    else if (percentage >= 70) printf("Grade: B\n");
    else if (percentage >= 60) printf("Grade: C\n");
    else printf("Grade: Needs Improvement\n");
}

int main(void) {
    int choice, i, valid;
    double a, b, result, marks[SUBJECTS], total, percentage, gpa;
    do {
        choice = -1;
        printf("\n=== CALCPRO ===\n1. Basic Calculator\n2. GPA Calculator\n0. Exit\nChoose: ");
        valid = scanf("%d", &choice);
        if (valid != 1) {
            printf("Please enter a number.\n");
            while (getchar() != '\n');
            continue;
        }
        switch (choice) {
            case 1:
                printf("Enter first number: ");
                if (scanf("%lf", &a) != 1) { printf("Invalid number.\n"); while (getchar() != '\n'); break; }
                printf("Enter second number: ");
                if (scanf("%lf", &b) != 1) { printf("Invalid number.\n"); while (getchar() != '\n'); break; }
                printf("1.Add  2.Subtract  3.Multiply  4.Divide: ");
                if (scanf("%d", &i) != 1) { printf("Invalid choice.\n"); while (getchar() != '\n'); break; }
                switch (i) {
                    case 1: result = a + b; break;
                    case 2: result = a - b; break;
                    case 3: result = a * b; break;
                    case 4:
                        if (b == 0) { printf("Cannot divide by zero.\n"); break; }
                        result = a / b; break;
                    default: printf("Choose 1 to 4.\n"); continue;
                }
                if (i >= 1 && i <= 4 && !(i == 4 && b == 0))
                    printf("Result: %.2f\n", result);
                break;
            case 2:
                total = 0;
                for (i = 0; i < SUBJECTS; i++) {
                    do {
                        printf("Enter marks for subject %d (0-100): ", i + 1);
                        valid = scanf("%lf", &marks[i]);
                        if (valid != 1) { printf("Enter a number.\n"); while (getchar() != '\n'); }
                        else if (marks[i] < 0 || marks[i] > 100)
                            printf("Marks must be between 0 and 100.\n");
                    } while (valid != 1 || marks[i] < 0 || marks[i] > 100);
                    total += marks[i];
                }
                percentage = total / SUBJECTS;
                gpa = calculateGPA(marks, SUBJECTS);
                displayGradeReport(percentage, gpa);
                break;
            case 0:
                printf("Goodbye!\n");
                break;
            default:
                printf("Invalid menu choice. Try again.\n");
        }
    } while (choice != 0);
    return 0;
}
