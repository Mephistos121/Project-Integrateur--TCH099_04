package com.example.projetintegrateur_tch099;

import android.content.Context;

import java.io.Serializable;

public class Representation implements Serializable {
    private int id;
    private int cinema_id;
    private int film_id;
    private String temps;
    private int salle_id;
    private double cout;

    public Representation(int id, int cinema_id, int film_id,String temps,int salle_id, double cout, Context context){
        this.id=id;
        this.cinema_id=cinema_id;
        this.film_id=film_id;
        this.temps=temps;
        this.salle_id=salle_id;
        this.cout=cout;
        fetchAllRepresentation(context);
    }

    private void fetchAllRepresentation(Context context){

    }

    public int getId() {
        return id;
    }

    public int getCinema_id() {
        return cinema_id;
    }

    public int getFilm_id() {
        return film_id;
    }

    public String getTemps() {
        return temps;
    }

    public int getSalle_id() {
        return salle_id;
    }

    public double getCout() {
        return cout;
    }

}
