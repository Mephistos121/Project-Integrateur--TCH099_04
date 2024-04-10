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

public class CinemaDao {

    private static CinemaDao instance = null;
    private final ArrayList<Cinema> cinemas = new ArrayList<>();

    private CinemaDao(Context context) {
        String url = "https://equipe500.tch099.ovh/projet4/api/cinemas";

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray jsonArray) {
                for (int i = 0; i < jsonArray.length(); i++) {
                    try {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);

                        Cinema cinema = new Cinema(jsonObject.getInt("id"), jsonObject.getString("nom_cinema"),
                                jsonObject.getString("image"), jsonObject.getString("localisation"), context);
                        cinemas.add(cinema);


                    } catch (JSONException e) {
                        System.out.println(e.getMessage());
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

    public static CinemaDao getInstance(Context context) {
        if (instance == null) {
            instance = new CinemaDao(context);
        }
        return instance;
    }
}
