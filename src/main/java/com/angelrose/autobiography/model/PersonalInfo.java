package com.angelrose.autobiography.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PersonalInfo {
    private String name;
    private String greeting;
    private String welcomeMessage;
    private String birthDate;
    private String location;
}
