import xml.etree.ElementTree as ET
import os

def generar_kml(xml_file, output_dir):
    ns = {'': 'http://www.uniovi.es'}
    ET.register_namespace('', 'http://www.uniovi.es')

    tree = ET.parse(xml_file)
    root = tree.getroot()

    rutas = root.findall('ruta', ns)

    for idx, ruta in enumerate(rutas, 1):
        nombre_ruta = ruta.find('nombreRuta', ns).text
        kml = ET.Element('kml')
        kml.set('xmlns', 'http://www.opengis.net/kml/2.2')

        document = ET.SubElement(kml, 'Document')
        name = ET.SubElement(document, 'name')
        name.text = nombre_ruta

        lugar_inicio = ruta.find('lugarInicio', ns).text
        coords = ruta.find('coordenadas', ns)
        lon = coords.find('longitud', ns).text
        lat = coords.find('latitud', ns).text
        alt = coords.find('altitud', ns).text

        origin = ET.SubElement(document, 'Placemark')
        origin_name = ET.SubElement(origin, 'name')
        origin_name.text = lugar_inicio
        origin_desc = ET.SubElement(origin, 'description')
        origin_desc.text = 'Inicio de la ruta'
        origin_point = ET.SubElement(origin, 'Point')
        origin_coords = ET.SubElement(origin_point, 'coordinates')
        origin_coords.text = f'{lon},{lat},{alt}'

        track = ET.SubElement(document, 'Placemark')
        track_name = ET.SubElement(track, 'name')
        track_name.text = 'Recorrido'
        track_line = ET.SubElement(track, 'LineString')
        track_coords = ET.SubElement(track_line, 'coordinates')
        coord_list = []

        hitos = ruta.find('hitos', ns)
        for hito in hitos.findall('hito', ns):
            hito_coords = hito.find('coordenadasHito', ns)
            h_lon = hito_coords.find('longitud', ns).text
            h_lat = hito_coords.find('latitud', ns).text
            h_alt = hito_coords.find('altitud', ns).text
            coord_list.append(f'{h_lon},{h_lat},{h_alt}')

            hito_placemark = ET.SubElement(document, 'Placemark')
            hito_name = ET.SubElement(hito_placemark, 'name')
            hito_name.text = hito.find('nombreHito', ns).text
            hito_desc = ET.SubElement(hito_placemark, 'description')
            hito_desc.text = hito.find('descripcionHito', ns).text
            hito_point = ET.SubElement(hito_placemark, 'Point')
            hito_coords_elem = ET.SubElement(hito_point, 'coordinates')
            hito_coords_elem.text = f'{h_lon},{h_lat},{h_alt}'

        track_coords.text = '\n'.join(coord_list)

        kml_str = ET.tostring(kml, encoding='unicode', xml_declaration=True)
        output_file = os.path.join(output_dir, f'planimetria_ruta{idx}.kml')
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(kml_str)
        print(f'Generado: {output_file}')

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    xml_path = os.path.join(script_dir, 'rutas.xml')
    generar_kml(xml_path, script_dir)
