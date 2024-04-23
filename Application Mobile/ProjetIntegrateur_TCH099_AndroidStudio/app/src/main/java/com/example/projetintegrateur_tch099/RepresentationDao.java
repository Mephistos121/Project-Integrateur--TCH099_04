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

public class RepresentationDao {
    private static RepresentationDao instance = null;
    private final ArrayList<Representation> representations = new ArrayList<>();

    private RepresentationDao(Context context) {
        String url = "https://equipe500.tch099.ovh/projet4/api/representations";

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray jsonArray) {
                for (int i = 0; i < jsonArray.length(); i++) {
                    try {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);

                        Representation representation = new Representation(jsonObject.getInt("id"), jsonObject.getInt("cinema_id"),
                                jsonObject.getInt("film_id"),jsonObject.getString("temps"),jsonObject.getInt("salle_id"),jsonObject.getDouble("cout"),context);
                        representations.add(representation);


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

    public static RepresentationDao getInstance(Context context) {
        if (instance == null) {
            instance = new RepresentationDao(context);
        }
        return instance;
    }

    public ArrayList<Representation> getRepresentations() {
        return representations;
    }
}
