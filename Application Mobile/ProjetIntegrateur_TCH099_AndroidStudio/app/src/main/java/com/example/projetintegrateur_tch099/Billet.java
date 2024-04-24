package com.example.projetintegrateur_tch099;

import android.content.Context;

public class Billet {

    private String nomFilm;
    private String temps;
    private String nomCinema;
    private int salleId;
    private int userId;
    private String place;
    private String  emplacement;


    public Billet(String nomFilm, String temps, String nomCinema, int salleId, int userId, String place, String emplacement) {
        this.nomFilm = nomFilm;
        this.temps = temps;
        this.nomCinema = nomCinema;
        this.salleId = salleId;
        this.userId = userId;
        this.place = place;
        this.emplacement = emplacement;
    }


    public Billet(int id, String cinemaId, String place) {
        this.salleId = id;
        this.nomCinema = cinemaId;
        this.place = place;

    }

    @Override
    public String toString() {
        return "Billet{" +
                "nomFilm='" + nomFilm + '\'' +
                ", temps='" + temps + '\'' +
                ", nomCinema='" + nomCinema + '\'' +
                ", salleId=" + salleId +
                ", place='" + place + '\'' +
                ", emplacement='" + emplacement + '\'' +
                '}';
    }

    public String getNomFilm() {
        return nomFilm;
    }

    public String getTemps() {
        return temps;
    }

    public String getNomCinema() {
        return nomCinema;
    }

    public int getSalleId() {
        return salleId;
    }

    public int getUserId() {
        return userId;
    }

    public String getPlace() {
        return place;
    }

    public String getEmplacement() {
        return emplacement;
    }
}
