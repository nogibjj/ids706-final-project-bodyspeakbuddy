resource "azurerm_resource_group" "rg" {
  name     = "myChatbotAppResourceGroup"
  location = "West Europe"
}

resource "azurerm_app_service_plan" "asp" {
  name                = "myChatbotAppServicePlan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_app_service" "app" {
  name                = "myChatbotAppService"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.asp.id

  site_config {
    app_command_line = ""
    # Other configurations...
  }

  app_settings = {
    # Environment variables...
  }
}
