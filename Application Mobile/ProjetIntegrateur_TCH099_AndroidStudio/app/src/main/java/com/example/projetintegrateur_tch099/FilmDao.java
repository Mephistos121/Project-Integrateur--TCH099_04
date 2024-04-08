package com.example.projetintegrateur_tch099;

import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class FilmDao {
    private static FilmDao instance = null;
    private ArrayList<Film> films = new ArrayList<>();

    public static FilmDao getInstance(Context context){
        if(instance == null){
            instance = new FilmDao(context);
        }
        return instance;
    }

    public ArrayList<Film> getFilms() {
        return films;
    }

    private FilmDao(Context context){
        String url = "https://equipe500.tch099.ovh/projet4/api/films";

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray jsonArray) {

                for (int i = 0; i < jsonArray.length(); i++) {
                    try {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        String nom_film = jsonObject.getString("nom_film");
                        String image = jsonObject.getString("image");
                        String description = jsonObject.getString("description");

                        Film film = new Film(nom_film,image,description);
                        films.add(film);
                    } catch (JSONException e) {
                        //Toast.makeText( ,e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                //add error message
            }
        });
        RequestQueue requestQueue = VolleySingleton.getInstance(context).getRequestQueue();
        requestQueue.add(jsonArrayRequest);
    }
}
