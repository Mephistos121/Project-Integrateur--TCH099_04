package com.example.projetintegrateur_tch099;

public class Film {

    private String nom_film;
    private String image;

    private String description;

    public Film(String nom_film, String image, String description) {
        this.nom_film = nom_film;
        this.image = image;
        this.description = description;
    }

    public String getNom_film() {
        return nom_film;
    }

    public void setNom_film(String nom_film) {
        this.nom_film = nom_film;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
