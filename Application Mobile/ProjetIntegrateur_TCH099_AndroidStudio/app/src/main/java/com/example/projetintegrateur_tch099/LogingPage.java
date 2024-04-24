package com.example.projetintegrateur_tch099;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.gson.JsonArray;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class LogingPage extends AppCompatActivity {

    private ImageView iconLogo;
    private TextView email;
    private TextView password;
    private Button loginButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_loging_page);

        iconLogo = findViewById(R.id.profileIcon);
        email = findViewById(R.id.emailLoginInfo);
        password = findViewById(R.id.passwordLoginInfo);
        loginButton = findViewById(R.id.loginButton);

        loginButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                fetchSalt(getApplicationContext());
            }
        });
    }

    private void fetchSalt(Context context){
        String url = "https://equipe500.tch099.ovh/projet4/api/comptes/"+email.getText().toString();
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(url, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject jsonObject) {
                try {
                    String tmpSalt = jsonObject.getString("salt");
                    verifyUser(context, tmpSalt);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Toast.makeText(LogingPage.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        RequestQueue requestQueue = VolleySingleton.getInstance(context).getRequestQueue();
        requestQueue.add(jsonObjectRequest);
    }

    private void verifyUser(Context context, String salt){
        String url = "https://equipe500.tch099.ovh/projet4/api/connexion";

        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("courriel", email.getText().toString());
            jsonObject.put("mot_passe", password.getText().toString());
            jsonObject.put("salt", salt);
            Log.d("ARRIVAL", jsonObject.toString());

        }catch (JSONException e){
            e.printStackTrace();
        }

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, jsonObject, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject jsonObject) {

                if (jsonObject == null) {
                    Toast.makeText(LogingPage.this, "Wrong email or password", Toast.LENGTH_LONG).show();
                } else {
                    fillInUser(context, email.getText().toString());
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Toast.makeText(LogingPage.this, "Error With the user name or password", Toast.LENGTH_SHORT).show();
            }
        });

        RequestQueue requestQueue = VolleySingleton.getInstance(context).getRequestQueue();
        requestQueue.add(jsonObjectRequest);
    }

    private void fillInUser(Context context, String email){

        String url = "https://equipe500.tch099.ovh/projet4/api/comptes/"+(email);
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(url, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject jsonObject) {
                try {
                    UserDao userDao = UserDao.getInstance(jsonObject.getInt("id"),jsonObject.getString("nom_usager"),jsonObject.getString("email"),context);

                    Intent i = new Intent(LogingPage.this, MainUserPage.class);
                    startActivity(i);

                } catch (JSONException e) {
                    Toast.makeText(LogingPage.this, "Error with parsing", Toast.LENGTH_LONG).show();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Toast.makeText(LogingPage.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        RequestQueue requestQueue = VolleySingleton.getInstance(context).getRequestQueue();
        requestQueue.add(jsonObjectRequest);
    }
}