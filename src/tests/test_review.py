from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Configuração do WebDriver
driver = webdriver.Chrome()  

# Abrir o site
driver.get("URL_DO_SEU_SISTEMA_DE_AVALIACAO")

# Aguarde a página carregar 
time.sleep(5)

# faca uma avaliação
try:
    # Encontre o campo de avaliação
    review_field = driver.find_element(By.ID, "ID_DO_CAMPO_DE_AVALIACAO")
    review_field.send_keys("Esta é uma avaliação de teste.")

    # Encontre o botão para enviar e clique
    submit_button = driver.find_element(By.ID, "ID_DO_BOTAO_ENVIAR")
    submit_button.click()

    # Verifique se a avaliação foi submetida com sucesso
    success_message = driver.find_element(By.ID, "ID_DA_MENSAGEM_DE_SUCESSO")
    if success_message.is_displayed():
        print("A avaliação foi enviada com sucesso.")
    else:
        print("Falha ao enviar a avaliação.")
except Exception as e:
    print(f"Erro ao enviar a avaliação: {e}")

# Feche o navegador
driver.quit()
