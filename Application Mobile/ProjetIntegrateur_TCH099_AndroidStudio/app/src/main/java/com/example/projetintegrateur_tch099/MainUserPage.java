package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

//import com.example.projetintegrateur_tch099.databinding.ActivityMainBinding;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;

public class MainUserPage extends AppCompatActivity {

    private BottomNavigationView bottomNavigationView;
    private ListView lvBillets;
    private ArrayList<Billet> billets;
    private boolean canResume;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_user_page);
        canResume=false;
        bottomNavigationView = findViewById(R.id.bottomNavigationViewMain);

        lvBillets = findViewById(R.id.listeViewBillets);

        UserDao userDao=UserDao.getInstance();

        billets=userDao.getListDeBillet();

        BilletListAdapter adapter = new BilletListAdapter(this,R.layout.billet_list_view, billets);

        lvBillets.setAdapter(adapter);

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
                canResume=true;
                Intent intent = new Intent(MainUserPage.this, Billeterie.class);
                startActivity(intent);
                return true;
            }

            if(item.getItemId() == R.id.websiteIcon){
                Uri uri = Uri.parse("https://equipe500.tch099.ovh/projet4/connexion.html");
                startActivity(new Intent(Intent.ACTION_VIEW,uri));
                return true;
            }

            if(item.getItemId() == R.id.userIcon){
                canResume=true;
                Intent intent = new Intent(MainUserPage.this, LoginPage.class);
                startActivity(intent);
                return true;
            }
            return false;
        });

    }

    @Override
    public void onResume() {
        super.onResume();
        if (canResume) {
            finish();
            startActivity(getIntent());
        }
    }
}