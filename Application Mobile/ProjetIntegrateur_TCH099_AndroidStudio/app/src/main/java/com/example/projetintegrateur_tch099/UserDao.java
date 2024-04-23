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

public class UserDao {

    private static UserDao instance = null;
    private String currentSalt;
    private int userId;
    private ArrayList<Billet> listDeBillet;
    private String nomUsager;
    private String email;

    public static UserDao getInstance(int userId, String nomUsager, String email, Context context) {
        if (instance == null) {
            instance = new UserDao(userId,nomUsager, email, context);
        }
        return instance;
    }
    private UserDao(int userId, String nomUsager, String email,  Context context){
        this.userId = userId;
        this.nomUsager = nomUsager;
        this.email = email;
        fetchAllBillet(context);
    }

    private void fetchAllBillet(Context context){
        //curently only the id 3 has any movies attached to it.
        String url = "https://equipe500.tch099.ovh/projet4/api/billets/user/"+userId;
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray jsonArray) {

                if(jsonArray.length() < 1){
                    System.out.println("ERROR");
                }else {
                    for (int i = 0; i < jsonArray.length(); i++) {
                        try {
                            JSONObject jsonObject = jsonArray.getJSONObject(i);


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


}
