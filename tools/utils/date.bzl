"""
Este módulo fornece utilitários para data e formatação.

Ele inclui a função `timestamp_utc`, que pode ser usada em regras genrule do Bazel para gerar
arquivos contendo o timestamp atual.
"""

def timestamp_utc(name, **kwargs):
    """
    Gera um timestamp UTC no formato ISO 8601 e grava-o em um arquivo de saída.

    Args:
        name (str): Nome do alvo da regra genrule.
        **kwargs: Parâmetros adicionais opcionais.
            - outs (list): Lista de arquivos de saída (padrão: ["created.txt"]).
            - local (int): Define se a genrule será executada localmente (padrão: 1).
            - cmd (str): Comando shell a ser executado (padrão: gera o timestamp UTC).

    Exemplo de uso:
        timestamp_utc(
            name = "timestamp_utc_target",
            outs = ["custom_output.txt"],
        )
    """

    cmd = """
        date -u +'%Y-%m-%dT%H:%M:%SZ' | tr -d '\\n' > $@
    """

    kwargs.setdefault("cmd", cmd)
    kwargs.setdefault("outs", ["created.txt"])
    kwargs.setdefault("local", 1)

    native.genrule(
        name = name,
        **kwargs
    )
