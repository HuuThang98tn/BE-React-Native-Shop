
SharedPreferences sharedPreferences = getSharedPreferences("sex",MODE_PRIVATE);
String gioiTinh ; 


public void checkGioiTinh() {
    radioGroup_mauSac.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
        @Override
        public void onCheckedChanged(RadioGroup group, int checkedId) {
            switch (checkedId) {
                case R.id.nam:
                    gioiTinh = "Nam";
                    Toast.makeText(getApplicationContext(), "Bạn chọn nam", Toast.LENGTH_SHORT).show();
                    break;
                case R.id.nu:
                    gioiTinh = "Nữ";
                    Toast.makeText(getApplicationContext(), "Bạn chọn nữ", Toast.LENGTH_SHORT).show();
                    break;
            }

        }
    });
}

 public void SaveSharedPref(View view){
     
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putString("sex", sex);
      
        editor.commit();
 }

 ///Lấy dữ lieu  Activity khác

 SharedPreferences prefs = getPreferences(MODE_PRIVATE); 

 String sex = prefs.getString("sex", null);


