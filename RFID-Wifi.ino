#include <ESP8266WiFi.h>
#include <SPI.h>
#include <MFRC522.h>

// Configuración de la red WiFi
const char* ssid = "Tu_SSID";
const char* password = "Tu_Password";

// Configuración del lector RFID
#define SS_PIN D8
#define RST_PIN D3
MFRC522 mfrc522(SS_PIN, RST_PIN);

WiFiClient client;

void setup() {
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}

void loop() {
  // Detectar nueva tarjeta
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    Serial.print("Card ID:");
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
      Serial.print(mfrc522.uid.uidByte[i], HEX);
    }
    Serial.println();

	if (client.connect("192.168.100.80", 3000)) {  
		String postData = "cardId=";
		for (byte i = 0; i < mfrc522.uid.size; i++) {
			postData += String(mfrc522.uid.uidByte[i], HEX);
		}
		client.println("POST /api/access/create HTTP/1.1");
		client.println("Host: 192.168.100.80");  
		client.println("Content-Type: application/x-www-form-urlencoded");
		client.print("Content-Length: ");
		client.println(postData.length());
		client.println();
		client.println(postData);
	}

    mfrc522.PICC_HaltA();
  }
}
