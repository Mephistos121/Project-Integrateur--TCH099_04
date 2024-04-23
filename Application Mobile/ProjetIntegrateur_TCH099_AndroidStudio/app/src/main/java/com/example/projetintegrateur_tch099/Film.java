package com.example.projetintegrateur_tch099;

import android.os.Parcel;

import androidx.annotation.NonNull;

import java.io.Serializable;

public class Film implements Serializable {

    private int id_film;
    private String nom_film;
    private String image;

    private String description;

    public Film(int id_film, String nom_film, String image, String description) {
        this.id_film=id_film;
        this.nom_film = nom_film;
        this.image = image;
        this.description = description;
    }

    public String getNom_film() {
        return nom_film;
    }


    public String getImage() {
        return image;
    }


    public String getDescription() {
        return description;
    }


    public int getId_film() {
        return id_film;
    }

}
