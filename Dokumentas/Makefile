fileName = kursinis

default: generuoti removeGenerated

generuoti:
	xelatex $(fileName).tex
	biber $(fileName)
	xelatex $(fileName).tex

ubuntu:
	echo "Diegiamas LaTeX (PdfLaTeX, XeTeX ir kt.)"
	sudo apt-get install texlive-full
	echo "Diegiama literatūros sąrašo tvarkyklė Biber skirta BibLaTeX paketui"
	sudo apt-get install biber
	echo "Diegiami OpenType šriftai"
	sudo apt-get install fonts-texgyre
	echo "Diegiamas Palemonas šriftas į sistemą"
	sudo cp -r Palemonas-2.1 /usr/share/fonts/truetype/


removeGenerated:
	rm -f $(fileName).toc $(fileName).run.xml $(fileName).log $(fileName).blg $(fileName).bcf $(fileName).bbl $(fileName).aux

clean:
	git clean -dfx
