package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

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

        Intent i = new Intent(LogingPage.this, ShowAllMovies.class);
        startActivity(i);

    }
}