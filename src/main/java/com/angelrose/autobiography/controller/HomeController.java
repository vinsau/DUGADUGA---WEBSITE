package com.angelrose.autobiography.controller;

import com.angelrose.autobiography.model.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.Year;
import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        // Personal Info
        PersonalInfo personalInfo = PersonalInfo.builder()
                .name("Angel Rose Y. Dugaduga")
                .greeting("Hi! I'm Angel Rose Y. Dugaduga")
                .welcomeMessage("Welcome to my Autobiography.\n\nDo you want to know more about me?")
                .birthDate("October 7, 2004")
                .location("Basak Kagudoy, Lapu-Lapu City")
                .build();

        // Navigation Links
        List<NavigationLink> navigationLinks = Arrays.asList(
                new NavigationLink("#home", "Home"),
                new NavigationLink("#about-me", "About Me"),
                new NavigationLink("#education", "Education"),
                new NavigationLink("#life", "Life"),
                new NavigationLink("#hobbies", "Hobbies"),
                new NavigationLink("#albums", "Albums"),
                new NavigationLink("#contact-me", "Contact Me")
        );

        // About Me Content
        String aboutMeContent = "I was born on October 7, 2004. I live in Basak Kagudoy, Lapu-Lapu City. " +
                "I live with my parents. I also have three older sisters.\n\n" +
                "My family is very close-knit, and we enjoy spending a lot of time together. " +
                "We are deeply family-oriented.\n\n" +
                "During my childhood, I was quite shy, especially around new people or strangers. " +
                "However, as I grew and went to high school, I became much more outgoing and approachable.\n\n" +
                "One of the highlights of my high school experience was the amazing friends I made. " +
                "Their friendship made my high school years truly memorable. " +
                "I pursue college to have a bachelor's degree and to be a successful individual in the future.";

        // Education Timeline
        List<Education> educationList = Arrays.asList(
                Education.builder()
                        .level("Kindergarten")
                        .institution("Bible Baptist")
                        .years("Age 4")
                        .build(),
                Education.builder()
                        .level("Elementary to Grade 10")
                        .institution("St. Augustine International School (SAIS)")
                        .years("Until Grade 10")
                        .build(),
                Education.builder()
                        .level("Senior High School")
                        .institution("Benthel Asia School of Technology Inc. (BAST)")
                        .years("Grade 11-12")
                        .build(),
                Education.builder()
                        .level("College")
                        .institution("Lapu-Lapu City College")
                        .years("Currently")
                        .degree("Bachelor's Science in Industrial Technology")
                        .build()
        );

        // Education Full Text
        String educationContent = "I went to school at the age of 4. In kindergarten, I attended Bible Baptist.\n\n" +
                "For elementary, I went to St. Augustine International School (SAIS) until grade 10.\n\n" +
                "For senior high school, I studied at Benthel Asia School of Technology Inc. (BAST) from grade 11 to 12.\n\n" +
                "Currently, I am a college student at Lapu-Lapu City College taking up Bachelor's Science in Industrial Technology.";

        // Life Content
        String lifeContent = "For me, life is about the bond we share with our loved ones and the trust we place in each other.\n\n" +
                "It's also about self-acceptance and being comfortable with who we are as individuals. " +
                "And once we learn to love ourselves, we can fully appreciate the beauty of life.\n\n" +
                "Ultimately, the most important relationship we have is with God. " +
                "We need to fully surrender and trust God in everything we do, for His plans are greater than ours.";

        // Hobbies Content
        String hobbiesContent = "Listening to music helps me relax and cheers me up, reading comics, " +
                "and spending time with my family. We also travel and enjoy doing things together.";

        // Album Images
        List<AlbumImage> albumImages = Arrays.asList(
                new AlbumImage("/images/BABYME.jpg", "Baby photo of Angel Rose Dugaduga"),
                new AlbumImage("/images/FAM.jpg", "Family photo of Angel Rose and her family"),
                new AlbumImage("/images/RECENT PIC.jpg", "Recent photo of Angel Rose")
        );

        // Social Links
        List<SocialLink> socialLinks = Arrays.asList(
                SocialLink.builder()
                        .platform("Facebook")
                        .url("https://www.facebook.com/ingqbus")
                        .icon("fab fa-facebook")
                        .build(),
                SocialLink.builder()
                        .platform("Instagram")
                        .url("https://www.instagram.com/ingqbus_7/")
                        .icon("fab fa-instagram")
                        .build()
        );

        // Add to model
        model.addAttribute("personalInfo", personalInfo);
        model.addAttribute("navigationLinks", navigationLinks);
        model.addAttribute("aboutMeContent", aboutMeContent);
        model.addAttribute("educationList", educationList);
        model.addAttribute("educationContent", educationContent);
        model.addAttribute("lifeContent", lifeContent);
        model.addAttribute("hobbiesContent", hobbiesContent);
        model.addAttribute("albumImages", albumImages);
        model.addAttribute("socialLinks", socialLinks);
        model.addAttribute("pageTitle", "Angel Rose Dugaduga's Autobiography");
        model.addAttribute("metaDescription", "Personal autobiography of Angel Rose Y. Dugaduga");
        model.addAttribute("currentYear", Year.now().getValue());

        return "index";
    }
}
