package com.angelrose.autobiography.model;

public class SocialLink {
    private String platform;
    private String url;
    private String icon;

    // No-args constructor
    public SocialLink() {}

    // All-args constructor
    public SocialLink(String platform, String url, String icon) {
        this.platform = platform;
        this.url = url;
        this.icon = icon;
    }

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String platform;
        private String url;
        private String icon;

        public Builder platform(String platform) {
            this.platform = platform;
            return this;
        }

        public Builder url(String url) {
            this.url = url;
            return this;
        }

        public Builder icon(String icon) {
            this.icon = icon;
            return this;
        }

        public SocialLink build() {
            return new SocialLink(platform, url, icon);
        }
    }

    // Getters and Setters
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
