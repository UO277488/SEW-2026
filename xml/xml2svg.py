import xml.etree.ElementTree as ET
import os

def generar_altimetria_svg(xml_file, output_dir):
    ns = {'': 'http://www.uniovi.es'}
    ET.register_namespace('', 'http://www.uniovi.es')

    tree = ET.parse(xml_file)
    root = tree.getroot()

    rutas = root.findall('ruta', ns)

    for idx, ruta in enumerate(rutas, 1):
        nombre_ruta = ruta.find('nombreRuta', ns).text
        hitos = ruta.find('hitos', ns)
        puntos = []

        dist_acum = 0
        for hito in hitos.findall('hito', ns):
            dist_str = hito.find('distancia', ns).text
            dist = float(dist_str) if dist_str else 0
            dist_acum += dist
            coords = hito.find('coordenadasHito', ns)
            alt = float(coords.find('altitud', ns).text)
            puntos.append((dist_acum, alt))

        if not puntos:
            continue

        margin = 50
        width = 900
        height = 400
        graph_w = width - 2 * margin
        graph_h = height - 2 * margin

        min_dist = 0
        max_dist = max(p[0] for p in puntos) if puntos else 1000
        min_alt = min(p[1] for p in puntos) if puntos else 0
        max_alt = max(p[1] for p in puntos) if puntos else 1000

        if max_dist == min_dist:
            max_dist = min_dist + 1000
        if max_alt == min_alt:
            max_alt = min_alt + 1000

        alt_range = max_alt - min_alt
        dist_range = max_dist - min_dist

        svg = ET.Element('svg')
        svg.set('xmlns', 'http://www.w3.org/2000/svg')
        svg.set('viewBox', f'0 0 {width} {height}')
        svg.set('width', str(width))
        svg.set('height', str(height))

        bg = ET.SubElement(svg, 'rect')
        bg.set('width', str(width))
        bg.set('height', str(height))
        bg.set('fill', 'white')
        bg.set('stroke', 'black')
        bg.set('stroke-width', '1')

        title = ET.SubElement(svg, 'text')
        title.set('x', str(width // 2))
        title.set('y', str(margin // 2))
        title.set('text-anchor', 'middle')
        title.set('font-size', '16')
        title.set('font-weight', 'bold')
        title.text = f'Altimetría - {nombre_ruta}'

        # Ejes
        axis = ET.SubElement(svg, 'line')
        axis.set('x1', str(margin))
        axis.set('y1', str(height - margin))
        axis.set('x2', str(width - margin))
        axis.set('y2', str(height - margin))
        axis.set('stroke', 'black')
        axis.set('stroke-width', '2')

        axis = ET.SubElement(svg, 'line')
        axis.set('x1', str(margin))
        axis.set('y1', str(margin))
        axis.set('x2', str(margin))
        axis.set('y2', str(height - margin))
        axis.set('stroke', 'black')
        axis.set('stroke-width', '2')

        # Etiquetas ejes
        x_label = ET.SubElement(svg, 'text')
        x_label.set('x', str(width // 2))
        x_label.set('y', str(height - 10))
        x_label.set('text-anchor', 'middle')
        x_label.set('font-size', '12')
        x_label.text = 'Distancia (metros)'

        y_label = ET.SubElement(svg, 'text')
        y_label.set('x', '12')
        y_label.set('y', str(height // 2))
        y_label.set('text-anchor', 'middle')
        y_label.set('font-size', '12')
        y_label.set('transform', f'rotate(-90, 12, {height // 2})')
        y_label.text = 'Altitud (metros)'

        # Polilínea
        polyline_points = []
        for p in puntos:
            x = margin + (p[0] - min_dist) / dist_range * graph_w
            y = margin + graph_h - (p[1] - min_alt) / alt_range * graph_h
            polyline_points.append(f'{x:.2f},{y:.2f}')

        polyline = ET.SubElement(svg, 'polyline')
        polyline.set('points', ' '.join(polyline_points))
        polyline.set('fill', 'none')
        polyline.set('stroke', 'red')
        polyline.set('stroke-width', '3')

        # Puntos con etiquetas de altitud
        for i, p in enumerate(puntos[:len(puntos)]):
            x = margin + (p[0] - min_dist) / dist_range * graph_w
            y = margin + graph_h - (p[1] - min_alt) / alt_range * graph_h

            circle = ET.SubElement(svg, 'circle')
            circle.set('cx', f'{x:.2f}')
            circle.set('cy', f'{y:.2f}')
            circle.set('r', '4')
            circle.set('fill', 'blue')

            # Etiqueta horizontal
            label = ET.SubElement(svg, 'text')
            label.set('x', f'{x + 8:.2f}')
            label.set('y', f'{y:.2f}')
            label.set('font-size', '10')
            label.set('fill', 'black')
            label.text = f'{p[1]:.0f}m'

            # Etiqueta vertical (distancia)
            d_label = ET.SubElement(svg, 'text')
            d_label.set('x', f'{x:.2f}')
            d_label.set('y', f'{height - margin + 15:.2f}')
            d_label.set('font-size', '9')
            d_label.set('text-anchor', 'middle')
            d_label.set('fill', '#666')
            d_label.text = f'{int(p[0])}m'

        # Cerrar polilínea (volver al origen)
        first_x = margin
        first_y = margin + graph_h - (min_alt - min_alt) / alt_range * graph_h
        close_line = ET.SubElement(svg, 'line')
        close_line.set('x1', f'{first_x:.2f}')
        close_line.set('y1', f'{first_y:.2f}')

        last_p = puntos[-1]
        last_x = margin + (last_p[0] - min_dist) / dist_range * graph_w
        close_line.set('x2', f'{last_x:.2f}')
        close_line.set('y2', f'{first_y:.2f}')
        close_line.set('stroke', 'red')
        close_line.set('stroke-width', '1')
        close_line.set('stroke-dasharray', '5,5')

        svg_str = ET.tostring(svg, encoding='unicode')

        output_file = os.path.join(output_dir, f'altimetria_ruta{idx}.svg')
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(svg_str)
        print(f'Generado: {output_file}')

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    xml_path = os.path.join(script_dir, 'rutas.xml')
    generar_altimetria_svg(xml_path, script_dir)
