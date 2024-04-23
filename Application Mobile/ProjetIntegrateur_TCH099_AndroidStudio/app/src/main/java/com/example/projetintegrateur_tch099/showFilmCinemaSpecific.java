package com.example.projetintegrateur_tch099;

import android.os.Bundle;
import android.widget.ListView;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.ArrayList;

public class showFilmCinemaSpecific extends AppCompatActivity {

    private ListView listOfMovies;
    private TextView cinemaName;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_show_film_cinema_specific);

        Bundle extras = getIntent().getExtras();
        int cinemaPosition = extras.getInt("cinema");

        CinemaDao dao = CinemaDao.getInstance(getApplicationContext());
        ArrayList<Cinema> daoCinemaList = dao.getCinemas();
        FilmListAdapter adapter = new FilmListAdapter(this,R.layout.film_list_item, daoCinemaList.get(cinemaPosition).getListDeFilm());

        listOfMovies = findViewById(R.id.listOfFilmsCinema);
        cinemaName = findViewById(R.id.titre_film_cinema);

        listOfMovies.setAdapter(adapter);
        listOfMovies.setClickable(true);


        cinemaName.setText(daoCinemaList.get(cinemaPosition).getNomCinema());
    }
}