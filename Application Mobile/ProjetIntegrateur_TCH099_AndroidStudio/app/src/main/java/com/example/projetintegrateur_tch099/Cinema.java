package com.example.projetintegrateur_tch099;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Cinema {

    private int id;
    String nomCinema;
    String image;
    String localisation;
    ArrayList<Film> listDeFilm;

    public Cinema(int id, String nomCinema, String image, String localisation, Context context) {
        this.id = id;
        this.nomCinema = nomCinema;
        this.image = image;
        this.localisation = localisation;
        this.listDeFilm = new ArrayList<>();
        fetchAllMovies(context);
    }

    private void fetchAllMovies(Context context){
        //curently only the id 3 has any movies attached to it.
        String url = "https://equipe500.tch099.ovh/projet4/api/films/"+id;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray jsonArray) {

                if(jsonArray.length() < 1){
                    Film noFilm = new Film(-1,"No movies","https://qph.cf2.quoracdn.net/main-qimg-0125930b81781949d403335295f19b04"
                            ,"Il n'y a pas de film pour ce cinema");
                    listDeFilm.add(noFilm);

                }else {
                    for (int i = 0; i < jsonArray.length(); i++) {
                        try {
                            JSONObject jsonObject = jsonArray.getJSONObject(i);

                            Film film = new Film(jsonObject.getInt("id"),jsonObject.getString("nom_film"),jsonObject.getString("image")
                                    , jsonObject.getString("description"));
                            listDeFilm.add(film);

                        } catch (JSONException e) {
                            System.out.println(e.getMessage());
                        }
                    }
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                //Toast.makeText(MainActivity.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        RequestQueue requestQueue = VolleySingleton.getInstance(context).getRequestQueue();
        requestQueue.add(jsonArrayRequest);

    }
    public void addFilm(Film film){
        listDeFilm.add(film);
    }

    public int getId() {
        return id;
    }

    public String getNomCinema() {
        return nomCinema;
    }

    public String getImage() {
        return image;
    }

    public String getLocalisation() {
        return localisation;
    }

    public ArrayList<Film> getListDeFilm() {
        return listDeFilm;
    }
}
