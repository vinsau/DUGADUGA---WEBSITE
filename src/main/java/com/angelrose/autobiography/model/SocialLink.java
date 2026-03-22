package com.angelrose.autobiography.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SocialLink {
    private String platform;
    private String url;
    private String icon;
}
