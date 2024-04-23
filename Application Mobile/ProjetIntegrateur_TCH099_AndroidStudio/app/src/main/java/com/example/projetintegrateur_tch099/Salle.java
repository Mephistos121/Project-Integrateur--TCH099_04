package com.example.projetintegrateur_tch099;

import java.util.ArrayList;

public class Salle {
    int salle_id;

    String[] places;

    Salle(int salle_id, String[] places){
        this.salle_id=salle_id;
        this.places=places;
    }

    public int getSalle_id() {
        return salle_id;
    }

    public String[] getPlaces() {
        return places;
    }



}
