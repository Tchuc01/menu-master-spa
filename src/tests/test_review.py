from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Configuração do WebDriver
driver = webdriver.Chrome()  

# Abrir o site
driver.get("http://localhost:3000/takeshi")

# Aguarde a página carregar 
time.sleep(5)

# faca uma avaliação
try:

    # Encontre o botão para enviar e clique
    submit_button = driver.find_element(By.CLASS_NAME, "vote-btn")
    submit_button.click()

    time.sleep(4)
    # Aguarde até que o botão de classificação (estrela 5) esteja visível e clique nele
    star_button = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "bt-star-4")))
    star_button.click()
    time.sleep(4)
    star_button = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "btn-danger")))
    star_button.click()
    time.sleep(4)
    novo_elemento = WebDriverWait(driver, 100).until(EC.presence_of_element_located((By.CLASS_NAME, "star-rating")))
    
    # Se chegou até aqui, significa que a página foi atualizada
    print("Avaliação completa!")

except Exception as e:
    print(f"Erro ao enviar a avaliação: {e}")

finally:
    # Fechar o navegador
    driver.quit()
