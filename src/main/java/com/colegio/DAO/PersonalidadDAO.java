package com.colegio.DAO;

import java.io.FileOutputStream;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.IPersonalidadDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Nota;
import com.colegio.entity.Personalidad;
import com.colegio.entity.Profesor;
import com.colegio.entity.Semestre;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Transactional
@Repository
public class PersonalidadDAO {

	@Autowired
	private IPersonalidadDAO ipersonalDAO;
	
	public IPersonalidadDAO crud() {
		return this.ipersonalDAO;
	}
	
	
	public void descargarPDF(Alumno alumno, Semestre semestre, HttpSession session) {

		Personalidad personalidad = null;
		Profesor profe = null;

		try {

			personalidad = this.ipersonalDAO.buscarPorIdAlumnoAndIdSemestre(alumno.getIdAlumno(), semestre.getIdSemestre());

			if (personalidad != null) {

				profe = (Profesor) session.getAttribute("usuario");

				Document document = new Document(PageSize.A4);
				document.addAuthor("colegio");
				document.addTitle("Informe Notas");
				
				String rutaPdf = ".//src//main//webapp//static//archivos//Informe_personalidad.pdf";

				PdfWriter.getInstance(document, new FileOutputStream(rutaPdf));
				document.open();

				// Creating an ImageData object
				String rutaImagenlogo = ".//src//main//webapp//static//imagenes//logo_colegio.png";
				String rutaImagenFirma = ".//src//main//webapp//static//imagenes//firma_colegio.png";
				
				
				Image imagenLogo = Image.getInstance(rutaImagenlogo);
				Image imagenFirma = Image.getInstance(rutaImagenFirma);
				
				imagenFirma.setAlignment(Element.ALIGN_RIGHT);

				
				Paragraph header = new Paragraph("SANTA MARIA DE PAINE\r\n" + 
						"INFORME DE PERSONALIDAD SEMESTRAL\r\n" + 
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

				PdfPTable table = new PdfPTable(2);

				table.setTotalWidth(500);
				table.setLockedWidth(true);

				table.addCell("AREA PERSONAL Y AFECTIVA");
				table.addCell("#");

				table.addCell("Cuida su higiene y presentación personal");
				table.addCell(personalidad.getHigienePresentacion());
				table.addCell("Manifiesta una positiva autoestima o valoración de sí mismo");
				table.addCell(personalidad.getAutoestimaValoracion());
				table.addCell("Trata de superar sus errores");
				table.addCell(personalidad.getSuperaErrores());
				table.addCell("Logra tolerar frustraciones y sobreponerse a ellas");
				table.addCell(personalidad.getToleraFrustraciones());
				table.addCell("Controla sus impulsos");
				table.addCell(personalidad.getControlaImpulsos());
				
				table.addCell("AREA SOCIAL");
				table.addCell("#");
				table.addCell("Se integra a su grupo de pares");
				table.addCell(personalidad.getIntegraGrupo());
				table.addCell("Resuelve con autonomía los problemas interpersonales que se le presentan");
				table.addCell(personalidad.getResuelveProblemasInterpersonales());
				table.addCell("Respeta las normas de convivencia establecidas por el colegio");
				table.addCell(personalidad.getRespetaNormasConvivencia());
				table.addCell("Manifiesta una actitud deferente y respetuosa con la comunidad");
				table.addCell(personalidad.getActitudRespetuosa());
				table.addCell("Demuestra preocupación y solidaridad por los problemas de los demas");
				table.addCell(personalidad.getPreocupacionSolidaridad());
				table.addCell("Respeta los bienes de uso común");
				table.addCell(personalidad.getRespetaBienes());
				
				
				table.addCell("AREA ACADEMICA");
				table.addCell("#");
				table.addCell("Desarrolla el trabajo escolar en forma sistémica y continua");
				table.addCell(personalidad.getTrabajoContinuo());
				table.addCell("Es responsable con sus deberes escolares");
				table.addCell(personalidad.getResponsableDeberes());
				table.addCell("Participa activamente en clases, contribuyendo al buen desarrollo de esta");
				table.addCell(personalidad.getParticipaClases());
				table.addCell("En su trabajo escolar demuestra emprendimiento");
				table.addCell(personalidad.getDemuestraEmprendimiento());
				table.addCell("Intercambia conocimientos y materiales con sus compañeros");
				table.addCell(personalidad.getIntercambiaConocimientos());
				table.addCell("Trata de superar las dificultades académicas que enfrenta");
				table.addCell(personalidad.getSuperaDificultades());
				table.addCell("Trabaja en clases en forma autónoma de acuerdo a las situaciones dadas");
				table.addCell(personalidad.getTrabajaClases());
				table.addCell("Manifiesta disposición para acatar las normas en el ambito académico");
				table.addCell(personalidad.getAcataNormas());
				table.addCell("Se observa dispuesto y concentrado en la tarea que realiza");
				table.addCell(personalidad.getDispuestoConcentrado());
				table.addCell("Manifiesta una actitud positiva y participativa frente a las diferentes actividades que ofrece el colegio");
				table.addCell(personalidad.getPositivoParticipativo());
				

				PdfPTable tableObservaciones = new PdfPTable(1);
				tableObservaciones.addCell("OBSERVACIONES");
				tableObservaciones.addCell(personalidad.getObservaciones());

				
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
				document.add(tableObservaciones);
				//end tabla
				
				
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
