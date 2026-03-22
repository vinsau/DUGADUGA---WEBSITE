package com.angelrose.autobiography.model;

public class PersonalInfo {
    private String name;
    private String greeting;
    private String welcomeMessage;
    private String birthDate;
    private String location;

    // No-args constructor
    public PersonalInfo() {}

    // All-args constructor
    public PersonalInfo(String name, String greeting, String welcomeMessage, String birthDate, String location) {
        this.name = name;
        this.greeting = greeting;
        this.welcomeMessage = welcomeMessage;
        this.birthDate = birthDate;
        this.location = location;
    }

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String name;
        private String greeting;
        private String welcomeMessage;
        private String birthDate;
        private String location;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder greeting(String greeting) {
            this.greeting = greeting;
            return this;
        }

        public Builder welcomeMessage(String welcomeMessage) {
            this.welcomeMessage = welcomeMessage;
            return this;
        }

        public Builder birthDate(String birthDate) {
            this.birthDate = birthDate;
            return this;
        }

        public Builder location(String location) {
            this.location = location;
            return this;
        }

        public PersonalInfo build() {
            return new PersonalInfo(name, greeting, welcomeMessage, birthDate, location);
        }
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGreeting() { return greeting; }
    public void setGreeting(String greeting) { this.greeting = greeting; }

    public String getWelcomeMessage() { return welcomeMessage; }
    public void setWelcomeMessage(String welcomeMessage) { this.welcomeMessage = welcomeMessage; }

    public String getBirthDate() { return birthDate; }
    public void setBirthDate(String birthDate) { this.birthDate = birthDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
