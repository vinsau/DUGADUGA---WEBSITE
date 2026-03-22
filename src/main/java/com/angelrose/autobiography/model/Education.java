package com.angelrose.autobiography.model;

public class Education {
    private String level;
    private String institution;
    private String years;
    private String degree;

    // No-args constructor
    public Education() {}

    // All-args constructor
    public Education(String level, String institution, String years, String degree) {
        this.level = level;
        this.institution = institution;
        this.years = years;
        this.degree = degree;
    }

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String level;
        private String institution;
        private String years;
        private String degree;

        public Builder level(String level) {
            this.level = level;
            return this;
        }

        public Builder institution(String institution) {
            this.institution = institution;
            return this;
        }

        public Builder years(String years) {
            this.years = years;
            return this;
        }

        public Builder degree(String degree) {
            this.degree = degree;
            return this;
        }

        public Education build() {
            return new Education(level, institution, years, degree);
        }
    }

    // Getters and Setters
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getYears() { return years; }
    public void setYears(String years) { this.years = years; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
}
