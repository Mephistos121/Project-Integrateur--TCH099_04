package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
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
    private Button chosirFilm;
    private Button goBackButton;
    private Film film;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_display_specific_movie);

        movieImage = findViewById(R.id.movieImage);
        movieTitle = findViewById(R.id.movieTitle);
        movieDescription = findViewById(R.id.movieDescription);
        goBackButton = findViewById(R.id.goBackButton);
        chosirFilm = findViewById(R.id.btnChoixFilm);

        Bundle extras = getIntent().getExtras();

        film = (Film) extras.getSerializable("film");
        movieTitle.setText(film.getNom_film());
        movieDescription.setText(film.getDescription());
        Glide.with(this).load(film.getImage()).into(movieImage);


        goBackButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
        chosirFilm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FilmChoisiSingleton filmCh = FilmChoisiSingleton.getInstance();
                filmCh.setFilmChoisi(film);
            }
        });
    }
}