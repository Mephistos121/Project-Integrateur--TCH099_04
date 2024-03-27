package com.example.projetintegrateur_tch099;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;

public class DisplaySpecificMovie extends AppCompatActivity {

    private ImageView movieImage;
    private TextView movieTitle;
    private TextView movieDescription;
    private Button goBackButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_display_specific_movie);

        movieImage = findViewById(R.id.movieImage);
        movieTitle = findViewById(R.id.movieTitle);
        movieDescription = findViewById(R.id.movieDescription);
        goBackButton = findViewById(R.id.goBackButton);

        //Bundle bundle = getIntent().getExtras();
        Glide.with(this).load("movieImageKey").into(movieImage);
    }
}