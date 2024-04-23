package com.example.projetintegrateur_tch099;

import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

public class Representation {
    private int id;
    private int cinema_id;
    private int film_id;
    private String temps;
    private int salle_id;
    private double cout;

    private Salle salle;

    public Representation(int id, int cinema_id, int film_id,String temps,int salle_id, double cout,Context context){
        this.id=id;
        this.cinema_id=cinema_id;
        this.film_id=film_id;
        this.temps=temps;
        this.salle_id=salle_id;
        this.cout=cout;
        fetchSalle(context);
    }


    private void fetchSalle(Context context) {
        String url = "https://equipe500.tch099.ovh/projet4/api/salle/representation/" + id;
        Log.d("ada234", "noWorky?");
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject jsonObject) {
                try {
                    Log.d("ada234", "worky!");
                    salle = new Salle(salle_id, jsonObject.getString("sieges").split(","));
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                //Toast.makeText(MainActivity.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        RequestQueue requestQueue = VolleySingleton.getInstance(context).getRequestQueue();
        requestQueue.add(jsonObjectRequest);
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
    public Salle getSalle() {
        return salle;
    }

}
