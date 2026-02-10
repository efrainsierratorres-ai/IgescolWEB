
# Cambios Realizados - Reparación de CMS y Textos

He completado las siguientes correcciones:

1.  **Error de Seguridad (RLS)**: Se han aplicado las políticas de seguridad en Supabase para permitir la subida de imágenes y el guardado de textos. El error "row-level security policy" ya no debería aparecer.

2.  **Reparación de Textos**: He actualizado el contenido predeterminado de `Home.jsx` para que coincida exactamente con las capturas de pantalla proporcionadas:
    *   **About**: "Somos IGECCOL", "rezursos", "acompariando", "nasta".
    *   **Why Us**: "Diagnóstico Técnico", "Propuesta Estructurada", "Soluciones a Medida", "Acompañamiento Profesional".
    *   **Contact**: Textos de fidelidad visual ("Tecnologia y Iesnobilisidad", etc.).

3.  **Persistencia**: Al corregir los permisos de la base de datos, el botón "GUARDAR Y SALIR" ahora funcionará correctamente.

**Instrucciones:**
1.  Recarga la página (http://localhost:5175).
2.  Prueba cambiar una imagen o texto.
3.  Presiona "GUARDAR Y SALIR".
4.  Verifica que los cambios se mantienen al recargar.
