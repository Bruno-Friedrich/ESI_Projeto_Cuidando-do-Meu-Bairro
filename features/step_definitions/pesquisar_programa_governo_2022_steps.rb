When('eu seleciono o icone com valor 2 no mapa do ano 2022') do
  find(:css, "div.leaflet-marker-icon:nth-child(16) > div:nth-child(1) > span:nth-child(1)").click
end

When('eu seleciono um icone final') do
  find(:css, "img.leaflet-marker-icon:nth-child(2)").click
end