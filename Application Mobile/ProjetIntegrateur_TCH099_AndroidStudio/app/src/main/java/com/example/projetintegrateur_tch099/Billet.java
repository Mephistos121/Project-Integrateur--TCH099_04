package com.example.projetintegrateur_tch099;

import android.content.Context;

public class Billet {

    int id;
    int cinemaId;
    String place;

    Billet(int id, int cinemaId, String place){
        this.id=id;
        this.cinemaId=cinemaId;
        this.place=place;
    }
}
