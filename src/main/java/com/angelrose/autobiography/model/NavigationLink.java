package com.angelrose.autobiography.model;

public class NavigationLink {
    private String url;
    private String label;

    // No-args constructor
    public NavigationLink() {}

    // All-args constructor
    public NavigationLink(String url, String label) {
        this.url = url;
        this.label = label;
    }

    // Getters and Setters
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
}
