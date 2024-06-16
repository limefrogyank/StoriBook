from bs4 import BeautifulSoup

def split_svgs(input_html, output_prefix):
    # Read the input HTML file
    with open(input_html, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
    
    # Find all SVG elements
    svg_elements = soup.find_all('svg')
    
    # Create separate HTML files for each SVG element
    for idx, svg in enumerate(svg_elements, start=1):
        output_file = f"{output_prefix}{idx:02}.html"
        with open(output_file, 'w', encoding='utf-8') as file:
            # Write the SVG element inside a basic HTML structure
            #file.write('<!DOCTYPE html>\n<html>\n<head>\n<title>SVG Page</title>\n</head>\n<body>\n')
            file.write(str(svg))
            #file.write('\n</body>\n</html>')
    
    print(f"Created {len(svg_elements)} files.")

def split_divs(input_html, output_prefix):
    # Read the input HTML file
    with open(input_html, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
    
    # Find all div elements with class 'aSlideContent'
    div_elements = soup.find_all('div', class_='aSlideContent')
    
    # Create separate HTML files for each div element
    for idx, div in enumerate(div_elements, start=1):
        output_file = f"{output_prefix}{idx:02}.html"
        with open(output_file, 'w', encoding='utf-8') as file:
            # Write the div content inside a basic HTML structure
            #file.write('<!DOCTYPE html>\n<html>\n<head>\n<title>Slide Page</title>\n</head>\n<body>\n')
            file.write(str(div.decode_contents()))
            #file.write('\n</body>\n</html>')
    
    print(f"Created {len(div_elements)} files.")

# Example usage
split_divs('working.html', 'page')