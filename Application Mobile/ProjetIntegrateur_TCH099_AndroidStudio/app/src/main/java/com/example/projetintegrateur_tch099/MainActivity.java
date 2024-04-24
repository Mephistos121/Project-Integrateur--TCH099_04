package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    TextView gsonPrint;
    ProgressBar progressBar;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        progressBar = findViewById(R.id.progressBarMain);

<<<<<<< Updated upstream
        fetchMovies();
        fetchCinemas();
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent i = new Intent(MainActivity.this, LogingPage.class);
                startActivity(i);
            }
        }, 1500);
=======
        if (getIntent().getExtras() == null) {
            fetchMovies();
            fetchCinemas();
>>>>>>> Stashed changes

            final Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent i = new Intent(MainActivity.this, LoginPage.class);
                    startActivity(i);
                }
            }, 3000);
        }else {
            final Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent i = new Intent(MainActivity.this, MainUserPage.class);
                    startActivity(i);
                }
            }, 3000);
        }
    }

    private void fetchMovies(){
        FilmDao dao = FilmDao.getInstance(getApplicationContext());

    }

    public void fetchCinemas(){
      CinemaDao dao = CinemaDao.getInstance(getApplicationContext());
    }

}