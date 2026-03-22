package com.angelrose.autobiography.model;

public class AlbumImage {
    private String url;
    private String altText;

    // No-args constructor
    public AlbumImage() {}

    // All-args constructor
    public AlbumImage(String url, String altText) {
        this.url = url;
        this.altText = altText;
    }

    // Getters and Setters
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getAltText() { return altText; }
    public void setAltText(String altText) { this.altText = altText; }
}
