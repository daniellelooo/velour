import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    const { nombre, email, telefono, fecha, hora, lineaInteres } = body;
    
    if (!nombre || !email || !telefono || !fecha || !hora) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Validar formato de teléfono (10 dígitos)
    const telefonoRegex = /^3\d{9}$/;
    if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Formato de teléfono inválido' },
        { status: 400 }
      );
    }

    // Preparar datos para n8n
    const dataParaN8n = {
      tipo: 'visita',
      nombre,
      email,
      telefono,
      fecha,
      hora,
      lineaInteres: lineaInteres || 'No especificada',
      mensaje: body.mensaje || '',
      timestamp: new Date().toISOString(),
      origen: 'web_velour_studio'
    };

    // Enviar a n8n webhook
    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_VISITAS;
    
    if (n8nWebhookUrl && n8nWebhookUrl !== 'TU_WEBHOOK_URL_AQUI') {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataParaN8n),
      });

      if (!response.ok) {
        console.error('Error al enviar a n8n:', response.statusText);
        // No retornamos error al usuario, seguimos con el flujo
      }
    }

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      mensaje: 'Visita agendada correctamente',
      data: {
        nombre,
        fecha,
        hora,
        lineaInteres
      }
    });

  } catch (error) {
    console.error('Error en /api/agendar-visita:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Permitir CORS si es necesario
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
