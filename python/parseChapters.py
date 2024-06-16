import re
import logging

pageset = "11"

logging.basicConfig(level=logging.INFO)

def split_vtt(input_file):
    # Read the input file
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    # Initialize variables
    chapters = []
    current_chapter = []
    chapter_name = ""
    

    # Process each line
    for line in lines:
        lineStripped = line.strip()
        # if gotchapter:
        #    gotchapter=False
        # else:
        chapter_match = re.match(r"Chapters (\d+)", lineStripped)
        logging.info(lineStripped)
        if chapter_match:
            if current_chapter:
                chapters.append((chapter_name, current_chapter))
                current_chapter = []
            chapter_name = lines[lines.index(line) + 2].strip()
        current_chapter.append(lineStripped)

    
    if current_chapter:
        chapters.append((chapter_name, current_chapter))
    
    # Write each chapter to a separate file and create the index file
    with open('index.html', 'w', encoding='utf-8') as index_file:
        
        
        for idx, (name, chapter) in enumerate(chapters, start=1):
            output_file = f"pages{pageset}/page{idx:02}.html"
            pageNum = f"Page {idx:02}"
               
                
            index_file.write(f'<stori-page title="{name}" src="{output_file}">{pageNum}</stori-page>\n')

    
    print(f"Created {len(chapters)} files and an index.html file.")

# Example usage
split_vtt('input.vtt')