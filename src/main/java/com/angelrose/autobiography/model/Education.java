package com.angelrose.autobiography.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Education {
    private String level;
    private String institution;
    private String years;
    private String degree;
}
