from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Configuração do WebDriver
driver = webdriver.Chrome() 

# Abrir o site
driver.get("http://localhost:3000/asd")

# Aguarde a página carregar 
time.sleep(5)

# Verifique se o cardápio é exibido
try:
    menu = driver.find_element(By.CLASS_NAME, "item-card")  
    if menu.is_displayed():
        print("O cardápio está sendo exibido corretamente.")
    else:
        print("O cardápio não está sendo exibido.")
except Exception as e:
    print("O cardápio não está sendo exibido.")

# Feche o navegador
driver.quit()
