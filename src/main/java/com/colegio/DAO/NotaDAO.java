package com.colegio.DAO;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.stream.Stream;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.INotaDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Nota;
import com.colegio.entity.Profesor;
import com.colegio.entity.Semestre;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfImage;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.lowagie.text.Table;

@Transactional
@Repository
public class NotaDAO {

	@Autowired
	private INotaDAO iNotaDao;

	public INotaDAO crud() {
		return this.iNotaDao;
	}

	public static double round(double value, int places) {
		if (places < 0)
			throw new IllegalArgumentException();

		long factor = (long) Math.pow(10, places);
		value = value * factor;
		long tmp = Math.round(value);
		return (double) tmp / factor;
	}

	public void descargarPDF(Alumno alumno, Semestre semestre, HttpSession session) {

		List<Nota> listaNotas = null;
		Profesor profe = null;

		try {

			listaNotas = this.iNotaDao.findByAlumnoAndSemestre(alumno, semestre);

			if (listaNotas != null) {

				profe = (Profesor) session.getAttribute("usuario");

				Document document = new Document(PageSize.A4);
				document.addAuthor("colegio");
				document.addTitle("Informe Notas");

				PdfWriter.getInstance(document, new FileOutputStream("Informe_notas.pdf"));
				document.open();

				// Creating an ImageData object
				String rutaImagenlogo = ".//src//main//webapp//static//imagenes//logo_colegio.png";
				String rutaImagenFirma = ".//src//main//webapp//static//imagenes//firma_colegio.png";
				
				
				Image imagenLogo = Image.getInstance(rutaImagenlogo);
				Image imagenFirma = Image.getInstance(rutaImagenFirma);
				
				imagenFirma.setAlignment(Element.ALIGN_RIGHT);

				
				Paragraph header = new Paragraph("SANTA MARIA DE PAINE\r\n" + 
						"INFORME DE NOTAS SEMESTRAL\r\n" + 
						"ENSEÑANZA BASICA – "+semestre.getNombre());
				
				header.setAlignment(Element.ALIGN_CENTER);
				
				Paragraph paraRun = new Paragraph(
						"RUN: " + alumno.getRun() + "                                            Profesor(a) jefe: "
								+ profe.getNombre() + " " + profe.getApellido());
				Paragraph paraNombre = new Paragraph(
						"Nombre: " + alumno.getNombre() + " " + alumno.getApellidoP() + " " + alumno.getApellidoM());
				Paragraph paraCurso = new Paragraph("Curso: " + alumno.getCurso().getNumeroCurso());
				Paragraph footer = new Paragraph("_______________________                                                            _______________________\r\n"+
												"      PROFESOR(A) JEFE						                                                                            DIRECTOR(A)");
				
				
				Paragraph saltoDeLinea = new Paragraph(" ");

				PdfPTable table = new PdfPTable(new float[] { 6, 1, 1, 1, 1, 1, 1, 1, 1, 2 });

				table.setTotalWidth(500);
				table.setLockedWidth(true);

				table.addCell("RAMO");
				table.addCell("N 1");
				table.addCell("N 2");
				table.addCell("N 3");
				table.addCell("N 4");
				table.addCell("N 5");
				table.addCell("N 6");
				table.addCell("N 7");
				table.addCell("N 8");
				table.addCell("N F");

				double promedio = 0;
				double promedioFinal = 0;

				for (Nota nota : listaNotas) {
					table.addCell(nota.getRamo().getNombre());
					table.addCell(nota.getNota1() + "");
					table.addCell(nota.getNota2() + "");
					table.addCell(nota.getNota3() + "");
					table.addCell(nota.getNota4() + "");
					table.addCell(nota.getNota5() + "");
					table.addCell(nota.getNota6() + "");
					table.addCell(nota.getNota7() + "");
					table.addCell(nota.getNota8() + "");

					promedio = (nota.getNota1() + nota.getNota2() + nota.getNota3() + nota.getNota4()
							+ nota.getNota5() + nota.getNota6() + nota.getNota7() + nota.getNota8()) / 8;

					promedio = round(promedio, 1);
					

					if (promedio < 1) {
						promedio = 0;
					}

					table.addCell("         " + promedio);

					promedioFinal = promedioFinal + promedio;

				}

				promedioFinal = promedioFinal / listaNotas.size();

				PdfPTable tablePromedio = new PdfPTable(2);
				tablePromedio.addCell("PROMEDIO FINAL");
				tablePromedio.addCell("" + round(promedioFinal, 1));

				
				//construllendo el pdf
				
				document.add(imagenLogo);
				document.add(header);
				document.add(saltoDeLinea);
				document.add(saltoDeLinea);
				document.add(paraRun);
				document.add(paraNombre);
				document.add(paraCurso);
				document.add(saltoDeLinea);
				
				//iniciando tabla
				document.add(table);
				document.add(saltoDeLinea);
				document.add(tablePromedio);
				
				//end tabla
				
				document.add(saltoDeLinea);
				document.add(saltoDeLinea);
				document.add(saltoDeLinea);
				document.add(saltoDeLinea);
				document.add(saltoDeLinea);
				document.add(saltoDeLinea);
				document.add(imagenFirma);
				document.add(footer);
				document.close();

				System.out.println("PDF GENERADO EXITOSAMENTE");

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

}
