package com.angelrose.autobiography.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NavigationLink {
    private String url;
    private String label;
}
