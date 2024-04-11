package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.projetintegrateur_tch099.databinding.ActivityMainBinding;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainUserPage extends AppCompatActivity {

    private BottomNavigationView bottomNavigationView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_user_page);

        bottomNavigationView = findViewById(R.id.bottomNavigationViewMain);


        bottomNavigationView.setOnItemSelectedListener(item ->{

            if(item.getItemId() == R.id.filmIcon){
                Intent intent = new Intent(MainUserPage.this, ShowAllMovies.class);
                startActivity(intent);
                return true;
            }

            if(item.getItemId() == R.id.cinemaIcon){
                Intent intent = new Intent(MainUserPage.this, ShowAllCinemas.class);
                startActivity(intent);
                return true;
            }

            if(item.getItemId() == R.id.buy){
                //TO BE CODED
                return true;
            }

            if(item.getItemId() == R.id.websiteIcon){
                Uri uri = Uri.parse("https://equipe500.tch099.ovh/projet4/");
                startActivity(new Intent(Intent.ACTION_VIEW,uri));
                return true;
            }

            if(item.getItemId() == R.id.userIcon){
                Intent intent = new Intent(MainUserPage.this, LogingPage.class);
                startActivity(intent);
                return true;
            }
            return false;
        });

    }
}